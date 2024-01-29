const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].slice(2);
    const propValue = args[i + 1];
    parsedArgs[propName] = propValue;
  }
  let output = "";
  for (const propName in parsedArgs) {
    output += `${propName} is ${parsedArgs[propName]}, `;
  }
  output = output.slice(0, -2);
  console.log(output);
};

parseArgs();
