exports.handler = async function(event, context) {
    // Your server-side functionality
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully!" })
    };
  };
  