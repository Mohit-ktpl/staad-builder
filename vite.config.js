import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Set host to '0.0.0.0' or true to expose on all network interfaces
    host: "0.0.0.0",
    // You can also specify the port if you need a specific one
    port: 5173, // Default Vite port
  },
});
