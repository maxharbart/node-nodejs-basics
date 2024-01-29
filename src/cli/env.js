const parseEnv = () => {
  let output = "";

  for (let key in process.env) {
    if (key.startsWith("RSS_")) {
      output += `RSS_${key}=${process.env[key]}; `;
    }
  }
  console.log(output.trim());
};

parseEnv();
