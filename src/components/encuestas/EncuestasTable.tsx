import React, { useEffect, useState } from 'react';
import { Plus, Users, Calendar, Clock, Trash2, Tag, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdversarioModal from '../adversarios/AdversarioModal';
import ActualizacionModal from '../adversarios/ActualizacionModal';
import EncuestaModal from './EncuestaModal';

interface Adversario {
  id: string;
  nombre: string;
  partido: string;
  descripcion: string;
  fechaCreacion: Date;
}

interface Actualizacion {
  id: string;
  adversarioId: string;
  adversarioNombre: string;
  mensaje: string;
  tipo: 'positiva' | 'negativa' | 'neutral';
  fecha: string;
  hora: string;
  fechaCreacion: Date;
}

interface Candidato {
  id: string;
  nombre: string;
  intencionVoto: number;
  varianzaIntencion: number;
  varianzaConocimiento: number;
  varianzaSaldoOpinion: number;
}

interface Encuesta {
  id: string;
  nombre: string;
  fecha: string;
  empresa: string;
  fechaCreacion: string | Date;
  candidatos: Candidato[];
}

export default function EncuestasTable() {
  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [adversarios, setAdversarios] = useState<Adversario[]>([]);
  const [actualizaciones, setActualizaciones] = useState<Actualizacion[]>([]);
  const [isAdversarioModalOpen, setIsAdversarioModalOpen] = useState(false);
  const [isActualizacionModalOpen, setIsActualizacionModalOpen] = useState(false);
  const [isEncuestaModalOpen, setIsEncuestaModalOpen] = useState(false);

  // Cargar encuestas desde el backend al montar el componente
  useEffect(() => {
    fetch('/api/encuestas')
      .then(res => res.json())
      .then(data => setEncuestas(
        data.map((e: any) => ({
          ...e,
          fechaCreacion: new Date(e.fechaCreacion),
        }))
      ));
  }, []);

  // Cargar adversarios desde el backend al montar el componente
  useEffect(() => {
    fetch('/api/adversarios')
      .then(res => res.json())
      .then(data => {
        setAdversarios(
          data.map((a: any) => ({
            ...a,
            fechaCreacion: new Date(a.fechaCreacion),
          }))
        );
      });
  }, []);

  // Cargar actualizaciones desde el backend al montar el componente
  useEffect(() => {
    fetch('/api/adversarios/actualizaciones')
      .then(res => res.json())
      .then(data => {
        setActualizaciones(
          data.map((a: any) => ({
            ...a,
            fechaCreacion: new Date(a.fechaCreacion),
          }))
        );
      });
  }, []);

  const handleAddAdversario = async (nuevoAdversario: Omit<Adversario, 'id' | 'fechaCreacion'>) => {
    const response = await fetch('/api/adversarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoAdversario),
    });
    if (response.ok) {
      const adversario = await response.json();
      setAdversarios([
        { ...adversario, fechaCreacion: new Date(adversario.fechaCreacion) },
        ...adversarios,
      ]);
    } else {
      alert('Error al guardar adversario');
    }
  };

  const handleAddActualizacion = async (
    nuevaActualizacion: Omit<Actualizacion, 'id' | 'fechaCreacion' | 'adversarioNombre'>
  ) => {
    const adversario = adversarios.find(a => a.id === nuevaActualizacion.adversarioId);
    if (!adversario) return;

    const payload = {
      ...nuevaActualizacion,
      adversarioNombre: adversario.nombre,
    };

    const response = await fetch('/api/adversarios/actualizaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const actualizacion = await response.json();
      setActualizaciones([
        { ...actualizacion, fechaCreacion: new Date(actualizacion.fechaCreacion) },
        ...actualizaciones,
      ]);
    } else {
      alert('Error al guardar actualización');
    }
  };

  const handleAddEncuesta = async (nuevaEncuesta: any) => {
    const response = await fetch('/api/encuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEncuesta),
    });
    if (response.ok) {
      const encuesta = await response.json();
      setEncuestas([
        { ...encuesta, fechaCreacion: new Date(encuesta.fechaCreacion) },
        ...encuestas,
      ]);
    } else {
      alert('Error al guardar encuesta');
    }
  };

  const handleDeleteAdversario = async (id: string) => {
    const response = await fetch(`/api/adversarios/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setAdversarios(adversarios.filter(adversario => adversario.id !== id));
      setActualizaciones(actualizaciones.filter(act => act.adversarioId !== id));
    } else {
      alert('Error al eliminar adversario');
    }
  };

  const handleDeleteActualizacion = async (id: string) => {
    const response = await fetch(`/api/adversarios/actualizaciones/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setActualizaciones(actualizaciones.filter(actualizacion => actualizacion.id !== id));
    } else {
      alert('Error al eliminar actualización');
    }
  };

  const handleDeleteEncuesta = async (id: string) => {
    const response = await fetch(`/api/encuestas/${id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setEncuestas(encuestas.filter(encuesta => encuesta.id !== id));
    } else {
      alert('Error al eliminar encuesta');
    }
  };

  const formatFechaCreacion = (fecha: Date | string) => {
    const dateObj = fecha instanceof Date ? fecha : new Date(fecha);
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + dateObj.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFechaEvento = (fecha: string, hora: string) => {
    const fechaObj = new Date(fecha);
  if (isNaN(fechaObj.getTime())) return ''; 
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' a las ' + hora;
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return <TrendingUp className="w-4 h-4" />;
      case 'negativa':
        return <TrendingDown className="w-4 h-4" />;
      case 'neutral':
        return <Minus className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'negativa':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'neutral':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'Positiva para nosotros';
      case 'negativa':
        return 'Negativa para nosotros';
      case 'neutral':
        return 'Neutral';
      default:
        return 'Neutral';
    }
  };

  const actualizacionesOrdenadas = [...actualizaciones].sort((a, b) =>
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  // Helper para identificar candidato propio
  const esCandidatoPropio = (nombre: string) => {
    const lower = nombre.trim().toLowerCase();
    return lower === 'mandfred reyes' || lower === 'candidato propio';
  };

  return (
    <>
      <div className="space-y-6">
        {/* Sección de Adversarios */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 to-primary/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-accent-pink/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-accent-pink" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Adversarios Registrados
                </h2>
                <p className="text-gray-400 text-sm">
                  {adversarios.length} adversario{adversarios.length !== 1 ? 's' : ''} registrado{adversarios.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAdversarioModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nuevo Adversario</span>
            </button>
          </div>

          {/* Adversarios Grid */}
          <div className="relative z-10">
            {adversarios.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay adversarios registrados</h3>
                <p className="text-gray-400 mb-6">Registra el primer adversario para comenzar el seguimiento</p>
                <button
                  onClick={() => setIsAdversarioModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Registrar Adversario</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adversarios.map((adversario, index) => (
                  <div
                    key={adversario.id}
                    className="bg-card/50 border border-accent-pink/20 rounded-lg p-4 hover:border-accent-pink/40 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold">{adversario.nombre}</h3>
                      <button
                        onClick={() => handleDeleteAdversario(adversario.id)}
                        className="p-1 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                        title="Eliminar adversario"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    </div>
                    <p className="text-accent-pink text-sm font-medium mb-2">{adversario.partido}</p>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{adversario.descripcion}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Registrado: {formatFechaCreacion(adversario.fechaCreacion)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sección de Actualizaciones */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Actualizaciones de Adversarios
                </h2>
                <p className="text-gray-400 text-sm">
                  {actualizaciones.length} actualización{actualizaciones.length !== 1 ? 'es' : ''} registrada{actualizaciones.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsActualizacionModalOpen(true)}
              disabled={adversarios.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group ${
                adversarios.length === 0
                  ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nueva Actualización</span>
            </button>
          </div>

          {/* Actualizaciones Table */}
          <div className="relative z-10">
            {actualizaciones.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay actualizaciones</h3>
                <p className="text-gray-400 mb-6">
                  {adversarios.length === 0 
                    ? 'Primero registra un adversario para poder crear actualizaciones'
                    : 'Crea la primera actualización para comenzar el seguimiento'
                  }
                </p>
                {adversarios.length > 0 && (
                  <button
                    onClick={() => setIsActualizacionModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Actualización</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left p-4 text-gray-400 font-medium">Adversario</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Actualización</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Tipo</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Fecha del Evento</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Registrado</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {actualizacionesOrdenadas.map((actualizacion, index) => (
                      <tr 
                        key={actualizacion.id}
                        className="hover:bg-primary/5 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent-pink/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-accent-pink" />
                            </div>
                            <span className="text-white font-medium">{actualizacion.adversarioNombre}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-md">
                            <p className="text-white leading-relaxed">
                              {actualizacion.mensaje}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getTipoColor(actualizacion.tipo)}`}>
                            {getTipoIcon(actualizacion.tipo)}
                            <span>{getTipoLabel(actualizacion.tipo)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm">
                              {formatFechaEvento(actualizacion.fecha, actualizacion.hora)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {formatFechaCreacion(actualizacion.fechaCreacion)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteActualizacion(actualizacion.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                            title="Eliminar actualización"
                          >
                            <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Encuestas */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <Tag className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Encuestas Registradas
                </h2>
                <p className="text-gray-400 text-sm">
                  {encuestas.length} encuesta{encuestas.length !== 1 ? 's' : ''} registrada{encuestas.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsEncuestaModalOpen(true)}
              disabled={adversarios.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group ${
                adversarios.length === 0
                  ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500/10 border border-blue-500/30 text-blue-500 hover:bg-blue-500/20'
              }`}
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nueva Encuesta</span>
            </button>
          </div>

          {/* Encuestas Table - Visual Example */}
          <div className="relative z-10">
            <div className="rounded-xl shadow-lg bg-gradient-to-br from-blue-950/80 to-blue-800/80 p-4 border border-blue-700/40">
              <h3 className="text-xl font-bold text-center text-white mb-4 tracking-wide drop-shadow-lg">¿Por cuál candidato o candidata votaría para presidente de la República?</h3>
              
              {/* Tabla optimizada sin scroll */}
              <div className="w-full rounded-lg bg-white/5 backdrop-blur-md overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-900/60">
                      <th className="p-2 text-blue-200 font-semibold text-left w-16">Mes</th>
                      <th className="p-1 text-blue-400 font-bold text-center min-w-0">CANDIDATO PROPIO</th>
                      <th className="p-1 text-green-400 font-bold text-center min-w-0">Andrónico Rodríguez</th>
                      <th className="p-1 text-orange-400 font-bold text-center min-w-0">Chi Hyun Chung</th>
                      <th className="p-1 text-pink-400 font-bold text-center min-w-0">Jorge "Tuto" Quitoga</th>
                      <th className="p-1 text-yellow-400 font-bold text-center min-w-0">Luis Arce</th>
                      <th className="p-1 text-purple-400 font-bold text-center min-w-0">Manfred Reyes</th>
                      <th className="p-1 text-gray-400 font-bold text-center min-w-0">Otros</th>
                      <th className="p-1 text-teal-400 font-bold text-center min-w-0">Samuel Doria</th>
                      <th className="p-1 text-red-400 font-bold text-center min-w-0">Edman Lara</th>
                      <th className="p-1 text-lime-400 font-bold text-center min-w-0">Jaime Dunn</th>
                      <th className="p-1 text-indigo-400 font-bold text-center min-w-0">Tuto Quiroga</th>
                      <th className="p-1 text-fuchsia-400 font-bold text-center min-w-0">Eduardo del Castillo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-700/30">
                    {/* Datos dummy por mes y candidato */}
                    {[
                      { mes: 'Ene', propio: 15, andronico: 10, chi: 8, tuto: 7, arce: 12, manfred: 9, otros: 5, samuel: 6, edman: 4, jaime: 3, tutoq: 5, eduardo: 2 },
                      { mes: 'Feb', propio: 16, andronico: 11, chi: 7, tuto: 8, arce: 13, manfred: 8, otros: 6, samuel: 5, edman: 4, jaime: 2, tutoq: 6, eduardo: 3 },
                      { mes: 'Mar', propio: 14, andronico: 9, chi: 9, tuto: 6, arce: 11, manfred: 10, otros: 4, samuel: 7, edman: 3, jaime: 4, tutoq: 4, eduardo: 2 },
                      { mes: 'Abr', propio: 12, andronico: 8, chi: 10, tuto: 9, arce: 10, manfred: 7, otros: 5, samuel: 8, edman: 2, jaime: 5, tutoq: 3, eduardo: 4 },
                      { mes: 'May', propio: 13, andronico: 9, chi: 8, tuto: 7, arce: 12, manfred: 8, otros: 6, samuel: 6, edman: 3, jaime: 4, tutoq: 5, eduardo: 2 },
                      { mes: 'Jun', propio: 17, andronico: 12, chi: 6, tuto: 8, arce: 14, manfred: 9, otros: 7, samuel: 5, edman: 4, jaime: 3, tutoq: 6, eduardo: 3 },
                      { mes: 'Jul', propio: 16, andronico: 10, chi: 7, tuto: 7, arce: 13, manfred: 10, otros: 5, samuel: 6, edman: 4, jaime: 2, tutoq: 5, eduardo: 2 },
                      { mes: 'Ago', propio: 14, andronico: 8, chi: 9, tuto: 6, arce: 11, manfred: 9, otros: 4, samuel: 7, edman: 3, jaime: 4, tutoq: 4, eduardo: 2 },
                      { mes: 'Sep', propio: 10, andronico: 8, chi: 7, tuto: 6, arce: 9, manfred: 7, otros: 4, samuel: 5, edman: 3, jaime: 2, tutoq: 4, eduardo: 1 },
                      { mes: 'Oct', propio: 12, andronico: 9, chi: 8, tuto: 7, arce: 10, manfred: 8, otros: 5, samuel: 6, edman: 4, jaime: 3, tutoq: 5, eduardo: 2 },
                      { mes: 'Nov', propio: 13, andronico: 10, chi: 9, tuto: 8, arce: 11, manfred: 9, otros: 6, samuel: 7, edman: 5, jaime: 4, tutoq: 6, eduardo: 3 },
                      { mes: 'Dic', propio: 14, andronico: 11, chi: 10, tuto: 9, arce: 12, manfred: 10, otros: 7, samuel: 8, edman: 6, jaime: 5, tutoq: 7, eduardo: 4 },
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-blue-900/30" : "bg-blue-800/30"}>
                        <td className="p-2 text-blue-100 font-semibold text-left">{row.mes}</td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-blue-400" style={{ width: `${Math.max(row.propio * 0.8, 8)}px` }}></div>
                            <span className="text-blue-300 font-bold text-xs mt-1">{row.propio}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-green-400" style={{ width: `${Math.max(row.andronico * 0.8, 8)}px` }}></div>
                            <span className="text-green-300 font-bold text-xs mt-1">{row.andronico}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-orange-400" style={{ width: `${Math.max(row.chi * 0.8, 8)}px` }}></div>
                            <span className="text-orange-300 font-bold text-xs mt-1">{row.chi}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-pink-400" style={{ width: `${Math.max(row.tuto * 0.8, 8)}px` }}></div>
                            <span className="text-pink-300 font-bold text-xs mt-1">{row.tuto}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-yellow-400" style={{ width: `${Math.max(row.arce * 0.8, 8)}px` }}></div>
                            <span className="text-yellow-300 font-bold text-xs mt-1">{row.arce}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-purple-400" style={{ width: `${Math.max(row.manfred * 0.8, 8)}px` }}></div>
                            <span className="text-purple-300 font-bold text-xs mt-1">{row.manfred}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-gray-400" style={{ width: `${Math.max(row.otros * 0.8, 8)}px` }}></div>
                            <span className="text-gray-300 font-bold text-xs mt-1">{row.otros}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-teal-400" style={{ width: `${Math.max(row.samuel * 0.8, 8)}px` }}></div>
                            <span className="text-teal-300 font-bold text-xs mt-1">{row.samuel}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-red-400" style={{ width: `${Math.max(row.edman * 0.8, 8)}px` }}></div>
                            <span className="text-red-300 font-bold text-xs mt-1">{row.edman}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-lime-400" style={{ width: `${Math.max(row.jaime * 0.8, 8)}px` }}></div>
                            <span className="text-lime-300 font-bold text-xs mt-1">{row.jaime}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-indigo-400" style={{ width: `${Math.max(row.tutoq * 0.8, 8)}px` }}></div>
                            <span className="text-indigo-300 font-bold text-xs mt-1">{row.tutoq}%</span>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-8 rounded bg-fuchsia-400" style={{ width: `${Math.max(row.eduardo * 0.8, 8)}px` }}></div>
                            <span className="text-fuchsia-300 font-bold text-xs mt-1">{row.eduardo}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdversarioModal
        isOpen={isAdversarioModalOpen}
        onClose={() => setIsAdversarioModalOpen(false)}
        onSubmit={handleAddAdversario}
      />

      <ActualizacionModal
        isOpen={isActualizacionModalOpen}
        onClose={() => setIsActualizacionModalOpen(false)}
        onSubmit={handleAddActualizacion}
        adversarios={adversarios}
      />

      <EncuestaModal
        isOpen={isEncuestaModalOpen}
        onClose={() => setIsEncuestaModalOpen(false)}
        onSubmit={handleAddEncuesta}
      />
    </>
  );
}