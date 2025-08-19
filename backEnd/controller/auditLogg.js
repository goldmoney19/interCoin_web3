import express from "express"
import mongoose from "mongoose"
import AuditLog from "../model/AuditLog.js";
import UAParser from 'ua-parser-js';





export const auditingLog = async (req, res, next) => {

try {
 const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Use UAParser to get browser and device info from the User-Agent header.
    const parser = new UAParser(req.headers['user-agent']);
    const browser = parser.getBrowser().name || 'Unknown Browser';
    const deviceInfo = parser.getDevice().type || 'Desktop';
    
   
    const country = 'Unknown'; 
    
 
    const userId = localStorage.getItem("user-id") || null; 

    // Create a new document with the collected data.
    const newLog = new AuditLog({
      userId,
      ipAddress,
      country,
      deviceInfo,
      browser,
    });

 await newLog.save();

    // Log to the console for debugging purposes.
    console.log(`[COMPLIANCE LOG] User ID: ${userId}, IP: ${ipAddress}, Browser: ${browser}`);

   next();
}catch(error){

console.error('Error writing to audit log:', error);
    next();

}


}

