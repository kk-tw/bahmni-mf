# Bahmni MF

This repo consists of three projects(MFE's). These projects are run and built separately. They can be uploaded to their own repository.

## Micro Front Ends
1. **mf-host** This is the host or the stitching layer. Consumes mf-consultation
2. **mf-consultation** This MFE will contain all logic for consultation module. Exposes itself and consumes mf-components
3. **mf-components** This MFE will act as the component library for Bahmni. It will have components from Carbon along with custom components built for Bahmni use
  
## Setup Steps
We will be able to set the project for development where each MFE will run on its own port (or) we can use docker to build and serve all three MicroFront ends on to a single port

### Setup Steps
1. Install nvm
2. Install node
3. Install yarn - https://yarnpkg.com/en/docs/install

### Development
1. Navigate to the sub folders (mf-host, mf-consultation and mf-components) and run `yarn`
2. Run `yarn start`. Note that dependent MF's server should already be started while starting. 
3. You will see all three MFE's running on three separate ports - http://localhost:8080 http://localhost8081 http://localhost:8082

### Build
1. Navigate to the root folder and run `docker compose up -d`
2. You will be able to see the host running on http://localhost:3000 consuming consultation and components from http://localhost:3000/consultation and http://localhost:3000/components

**NOTE**
The dockerization needs improvement and currently takes time. I have included it to check how we can build all MFE's into a single nginx server running on the same port. 