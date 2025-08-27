import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatPercentage, formatDate } from "../utils/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface MetricCardProps {
  value: string;
  label: string;
  sublabel: string;
  trend: "up" | "down";
  color: "teal" | "pink";
}

function MetricCard({ value, label, sublabel, trend, color }: MetricCardProps) {
  return (
    <div className={`target-card p-4 group animate-scale-in`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
          color === "teal" ? "bg-accent-teal" : "bg-accent-pink"
        }`}
      ></div>

      <div className="flex items-baseline gap-1">
        <div
          className={`text-[48px] font-bold ${
            color === "teal"
              ? "text-accent-teal text-neon"
              : "text-accent-pink text-neon"
          } leading-none tracking-tight animate-float`}
        >
          {value}
          <span
            className={`text-xl ml-2 ${
              trend === "up" ? "text-accent-teal" : "text-accent-pink"
            }`}
          >
            {trend === "up" ? "▲" : "▼"}
          </span>
        </div>
      </div>
      <div className="text-[10px] text-gray-300 uppercase mt-2 leading-tight group-hover:text-white transition-colors duration-300">
        {label}
        <div className="text-[9px] text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

// Agrega la función randomColor antes de usarla
const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

export default function TacticalTracking() {
  const [tacticalData, setTacticalData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/encuestas/tracking")
      .then((res) => res.json())
      .then((data) => {
        setTacticalData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Sort tactical data by date
  const sortedData = [...tacticalData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Agrupa y promedia los datos por fecha (día)
  const datosPorFecha: Record<string, any[]> = {};
  sortedData.forEach(item => {
    if (!datosPorFecha[item.date]) datosPorFecha[item.date] = [];
    datosPorFecha[item.date].push(item);
  });

  // Para cada fecha, calcula el promedio por candidato y normaliza a 100%
  const fechasNormalizadas = Object.entries(datosPorFecha).map(([date, items]) => {
    // Agrupa por candidato
    const candidatos = Array.from(new Set(items.map(i => i.candidate)));
    const promedios: Record<string, number> = {};
    candidatos.forEach(candidato => {
      const valores = items.filter(i => i.candidate === candidato).map(i => i.percentage || 0);
      promedios[candidato] = valores.length > 0
        ? valores.reduce((a, b) => a + b, 0) / valores.length
        : 0;
    });
    // Suma total
    const suma = Object.values(promedios).reduce((a, b) => a + b, 0);
    // Normaliza a 100%
    const normalizados: Record<string, number> = {};
    Object.entries(promedios).forEach(([candidato, valor]) => {
      normalizados[candidato] = suma > 0 ? (valor / suma) * 100 : 0;
    });
    return { date, normalizados };
  });

  // Helper para identificar candidato propio (más robusto, incluye variantes y quita espacios extras)
  const esCandidatoPropio = (nombre: string) => {
    if (!nombre) return false;
    const lower = nombre.trim().replace(/\s+/g, " ").toLowerCase();
    return (
      lower === "mandfred reyes" ||
      lower === "manfred reyes" ||
      lower === "candidato propio" ||
      lower.includes("mandfred") && lower.includes("reyes") ||
      lower.includes("manfred") && lower.includes("reyes")
    );
  };

  // Detecta nombres únicos de opositores
  const opositorNames = Array.from(
    new Set(
      fechasNormalizadas
        .flatMap(f => Object.keys(f.normalizados))
        .filter(name => !esCandidatoPropio(name) && name !== "NO SABE/NO CONTESTÓ")
    )
  );

  // Fechas únicas y formateadas
  const uniqueDates = fechasNormalizadas.map(f => f.date);
  const formattedDates = uniqueDates.map((date) => formatDate(date));

  // Declarar mesesUnicos antes de usarla
  const mesesUnicos = Array.from(
    new Set(
      uniqueDates.map(date => {
        const d = new Date(date);
        return d.toLocaleString("es-ES", { month: "long", year: "numeric" }).toUpperCase();
      })
    )
  );

  // Obtiene el porcentaje de intención de voto propio por mes
  const getPropioPorMes = (mes: string) => {
    // Filtra fechas que pertenecen al mes
    const fechasDelMes = uniqueDates.filter(date => {
      const d = new Date(date);
      return d.toLocaleString("es-ES", { month: "long", year: "numeric" }).toUpperCase() === mes;
    });
    // Toma la última fecha del mes
    const idx = uniqueDates.lastIndexOf(fechasDelMes[fechasDelMes.length - 1]);
    if (idx === -1) return { percentage: 0, trend: "up" };
    const propio = getCandidateData("CANDIDATO PROPIO")[idx];
    return { percentage: propio, trend: "up" };
  };

  // Prepara data series para cada candidato usando los datos normalizados
  const getCandidateData = (candidate: string) => {
    if (candidate === "CANDIDATO PROPIO") {
      return fechasNormalizadas.map(f => {
        // Suma ambos: "CANDIDATO PROPIO" y "Mandfred Reyes"
        let propio = 0;
        Object.entries(f.normalizados).forEach(([nombre, valor]) => {
          if (esCandidatoPropio(nombre)) propio += valor;
        });
        return propio;
      });
    } else {
      return fechasNormalizadas.map(f => f.normalizados[candidate] || 0);
    }
  };

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "CANDIDATO PROPIO",
        data: getCandidateData("CANDIDATO PROPIO"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(20, 184, 166, 0.5)");
          gradient.addColorStop(0.5, "rgba(20, 184, 166, 0.2)");
          gradient.addColorStop(1, "rgba(20, 184, 166, 0)");
          return gradient;
        },
        borderColor: "#14B8A6",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#14B8A6",
        pointBorderColor: "rgba(20, 184, 166, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#14B8A6",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
      // Datasets dinámicos para opositores
      ...opositorNames.map((name, idx) => ({
        label: name,
        data: getCandidateData(name),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          // Color aleatorio por opositor
          const color = randomColor();
          gradient.addColorStop(0, color + "80");
          gradient.addColorStop(0.5, color + "40");
          gradient.addColorStop(1, color + "00");
          return gradient;
        },
        borderColor: randomColor(),
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: randomColor(),
        pointBorderColor: randomColor() + "80",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: randomColor(),
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      })),
      // Dataset para "NO SABE/NO CONTESTÓ"
      {
        label: "NO SABE/NO CONTESTÓ",
        data: getCandidateData("NO SABE/NO CONTESTÓ"),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(147, 197, 253, 0.5)");
          gradient.addColorStop(0.5, "rgba(147, 197, 253, 0.2)");
          gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
          return gradient;
        },
        borderColor: "#93C5FD",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#93C5FD",
        pointBorderColor: "rgba(147, 197, 253, 0.5)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#93C5FD",
        pointHoverBorderColor: "#fff",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#94a3b8",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(10, 10, 10, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(20, 184, 166, 0.2)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(20, 184, 166, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return value + "%";
          },
        },
        border: {
          display: false,
        },
        min: 0,
        max: 100,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2,
      },
    },
  };

  const getLatestData = (candidate: string) => {
    const last = fechasNormalizadas[fechasNormalizadas.length - 1];
    if (!last || !last.normalizados) {
      return { percentage: 0, trend: "up" };
    }
    if (candidate === "CANDIDATO PROPIO") {
      let propio = 0;
      Object.entries(last.normalizados).forEach(([nombre, valor]) => {
        if (esCandidatoPropio(nombre)) propio += valor;
      });
      return { percentage: propio, trend: "up" };
    } else {
      return { percentage: last.normalizados[candidate] || 0, trend: "up" };
    }
  };

  // Calculate variances
  const getVariance = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  const latestPropio = getLatestData("CANDIDATO PROPIO");
  const previousPropio = 42.2; // Example previous value
  const votoVariance = getVariance(latestPropio.percentage, previousPropio);

  const currentConocimiento = 27.79;
  const previousConocimiento = 25.0;
  const conocimientoVariance = getVariance(
    currentConocimiento,
    previousConocimiento
  );

  const currentSaldo = 30.09;
  const previousSaldo = 32.0;
  const saldoVariance = getVariance(currentSaldo, previousSaldo);

  if (loading) {
    return (
      <div className="glassmorphic-container p-5 h-[550px] overflow-hidden animate-scale-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Cargando datos tácticos...</div>
        </div>
      </div>
    );
  }

  // Si no hay datos normalizados, muestra mensaje y evita crash
  if (!fechasNormalizadas || fechasNormalizadas.length === 0) {
    return (
      <div className="glassmorphic-container p-5 h-[550px] overflow-hidden animate-scale-in">
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">No hay datos disponibles para mostrar el tracking táctico.</div>
        </div>
      </div>
    );
  }

  // Calcula el promedio de intención de voto propio en todas las fechas
  const propioData = fechasNormalizadas.map(f => {
    let propio = 0;
    Object.entries(f.normalizados).forEach(([nombre, valor]) => {
      if (esCandidatoPropio(nombre)) propio += valor;
    });
    return propio;
  });
  const promedioPropio =
    propioData.length > 0 && propioData.some(v => v > 0)
      ? propioData.reduce((a, b) => a + b, 0) / propioData.length
      : 0;

  return (
    <div className="glassmorphic-container p-5 h-[550px] overflow-hidden animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>

      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative">
        TRACKING TÁCTICO
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>

      {/* Solo un MetricCard con el promedio */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full max-w-xs">
          <MetricCard
            value={formatPercentage(promedioPropio)}
            label="INTENCIÓN DE VOTO PROMEDIO"
            sublabel="TODOS LOS MESES"
            trend={promedioPropio >= 0 ? "up" : "down"}
            color="teal"
          />
        </div>
      </div>

      {/* Commented out cards as requested 
        <MetricCard
          value={"0"}
          label="VARIANZA EN INTENCIÓN DE VOTO"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(votoVariance) >= 0 ? "up" : "down"}
          color={Number(votoVariance) >= 0 ? "teal" : "pink"}
        />
        <MetricCard
          value={"0"}
          label="VARIANZA EN CONOCIMIENTO"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(conocimientoVariance) >= 0 ? "up" : "down"}
          color={Number(conocimientoVariance) >= 0 ? "teal" : "pink"}
        />
        <MetricCard
          value={"0"}
          label="VARIANZA EN SALDO DE OPINIÓN"
          sublabel="RESPECTO AL ÚLTIMO PERIODO"
          trend={Number(saldoVariance) >= 0 ? "up" : "down"}
          color={Number(saldoVariance) >= 0 ? "teal" : "pink"}
        />
      */}

      <div className="mt-4 h-[320px] relative">
        {/* Chart container with enhanced 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/60 to-card/40 rounded-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-lg opacity-50"></div>
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] rounded-lg"></div>

        {/* Mountain effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-lg"></div>

        <div className="relative h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}


