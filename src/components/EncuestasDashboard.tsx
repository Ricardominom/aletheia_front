import React from 'react';

export default function EncuestasDashboard() {
  return (
    <div className="glassmorphic-container p-4 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      {/* Encuestas Table - Visual Example */}
      <div className="relative z-10">
        <div className="rounded-xl shadow-lg bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md p-4 border border-primary/20">
          <h3 className="text-xl font-bold text-center text-white mb-4 tracking-wide drop-shadow-lg">¿Por cuál candidato o candidata votaría para presidente de la República?</h3>
          
          {/* Tabla optimizada sin scroll */}
          <div className="w-full rounded-lg bg-card/30 backdrop-blur-md overflow-hidden border border-primary/10">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-primary/10 border-b border-primary/20">
                  <th className="p-2 text-gray-300 font-semibold text-left w-16">Mes</th>
                  <th className="p-1 text-primary font-bold text-center min-w-0">CANDIDATO PROPIO</th>
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
              <tbody className="divide-y divide-primary/10">
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
                  <tr key={idx} className={idx % 2 === 0 ? "bg-primary/5" : "bg-card/20"}>
                    <td className="p-2 text-gray-300 font-semibold text-left">{row.mes}</td>
                    <td className="p-1 text-center">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-8 rounded bg-primary" style={{ width: `${Math.max(row.propio * 0.8, 8)}px` }}></div>
                        <span className="text-primary font-bold text-xs mt-1">{row.propio}%</span>
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
  );
}
