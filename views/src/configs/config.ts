const dev = {
    apiGateway: {
      URL: "http://localhost:3000/"
    }
  };
  
  const prod = {
    apiGateway: {
      URL: "/"
    }
  };
  
  const config = {
    ...(process.env.NODE_ENV === "development" ? dev : prod),
  };
  
  export default config;