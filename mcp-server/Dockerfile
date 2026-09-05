# LEEWAY HEADER — DO NOT REMOVE
# REGION: LEEWAY.SKILLS.MCP.DEPLOY
# TAG: LEEWAY.SKILLS.MCP.DEPLOY.DOCKER
# WHAT: Production image for the LeeWay remote MCP context gateway
# WHY: Provide a reproducible HTTP deployment unit
# WHO: Leeway Industries (By Leonard Jerome Lee)
# WHERE: mcp-server/Dockerfile
# WHEN: 2026
# HOW: Node 20 multi-stage build with only required registry/skill artifacts copied to runtime
# LICENSE: MIT

FROM node:20-alpine AS build
WORKDIR /app
COPY mcp-server/package.json mcp-server/package-lock.json ./mcp-server/
RUN cd mcp-server && npm install --no-audit --no-fund
COPY mcp-server ./mcp-server
COPY scripts ./scripts
COPY skills ./skills
RUN cd mcp-server && npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/mcp-server/package.json /app/mcp-server/package-lock.json ./mcp-server/
COPY --from=build /app/mcp-server/node_modules ./mcp-server/node_modules
COPY --from=build /app/mcp-server/dist ./mcp-server/dist
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/skills ./skills
WORKDIR /app/mcp-server
EXPOSE 8788
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8788)+'/healthz').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "dist/http.js"]
