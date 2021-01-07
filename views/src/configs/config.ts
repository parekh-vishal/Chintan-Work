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
    ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
  };
  
  export default config;