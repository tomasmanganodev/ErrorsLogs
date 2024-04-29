const ErrorLog = require('../models/errorLogModel.js');

async function createErrorLog(errorLogData) {
  try {
    const newErrorLog = new ErrorLog(errorLogData);
    return await newErrorLog.save();
  } catch (error) {
    throw error;
  }
}

async function getErrorLogs(filters) {
    try {
        let query = {};
    
        // Aplicar filtro de gravedad si está presente
        if (filters.gravedad) {
          query.gravedad = filters.gravedad;
        }
    
        // Aplicar filtro de sistema si está presente
        if (filters.sistema) {
          query.sistema = filters.sistema;
        }

        // Aplicar filtro de sistema operativo (OS) si está presente
        if (filters.os) {
            query['entorno.os'] = filters.os;
        }

        // Aplicar filtro de descripción si está presente
        if (filters.descripcion) {
        query['detalles.descripcion'] = filters.descripcion;
        }
         
          // Aplicar filtro de código de error si está presente
        if (filters.errorCod) {
        query['detalles.errorCod'] = filters.errorCod;
         }
  
        // Aplicar filtro de usuario si está presente
        if (filters.usuario) {
            query['detalles.usuario'] = filters.usuario;
        }
    
        // Aplicar filtro de acción si está presente
        if (filters.accion) {
            query['detalles.accion'] = filters.accion;
        }
        // Aplicar filtro de fecha si está presente
        if (filters.fecha) {
          const fecha = new Date(filters.fecha);
          const fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
          const fechaFin = new Date(fechaInicio);
          fechaFin.setDate(fechaInicio.getDate() + 1); // Añadir un día para filtrar hasta el final del día
          query.fechaHora = {
            $gte: fechaInicio,
            $lt: fechaFin
          };
        }
    
        // Realizar la consulta y devolver los resultados
        return await ErrorLog.find(query);
  } catch (error) {
    throw error;
  }
}

async function getErrorLogById(id) {
  try {
    return await ErrorLog.findById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createErrorLog,
  getErrorLogs,
  getErrorLogById
};