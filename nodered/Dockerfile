ARG BASEIMAGE_TAG='latest'
FROM nodered/node-red:${BASEIMAGE_TAG}

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY package.json .
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
COPY settings.js /data/settings.js
# COPY flows_cred.json /data/flows_cred.json
# COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
#WORKDIR /usr/src/node-red
#RUN npm install node-red-node-smooth

# Install extra nodes

# RUN set -x && \
#   npm install \
#             passport \
#             @exlinc/keycloak-passport \
#             node-red-contrib-openid
#             # node-red-contrib-buffer-array \
#             # node-red-contrib-cayennelpp-extended \
#             # node-red-contrib-counter \
#             # node-red-contrib-embedded-file \
#             # node-red-contrib-google-sheets \
#             # node-red-contrib-interval-length \
#             # node-red-contrib-socketio \
#             # node-red-contrib-splitter \
#             # node-red-node-ui-table \
#             # node-red-dashboard \
#             # node-red-node-tail