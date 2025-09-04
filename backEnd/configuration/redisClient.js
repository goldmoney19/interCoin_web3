import redis from 'redis'
import dotenv from "dotenv"




const client = redis.createClient({
  url: "redis://default:5malaqtqEydv51Y6pUejpNLYq2TER5eH@redis-19833.c57.us-east-1-4.ec2.redns.redis-cloud.com:19833"
});

client.on('connect', () => console.log('Redis connected'));
client.on('error', (err) => console.error('Redis error', err));

export default client;