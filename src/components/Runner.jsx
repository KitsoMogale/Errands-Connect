import React, { useEffect, useState } from 'react';

function Runner() {
  const [clientId, setClientId] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [targetClientId, setTargetClientId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      // Send the client ID to the server
      ws.send(JSON.stringify({ id: `client-${Math.random().toString(36).substring(2)}` }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
    //   if (data.clientId) {
        // Store the assigned client ID
        // setClientId(data.clientId);
    //     console.log(`Assigned Client ID: ${data.clientId}`);
    //   } else {
        // Handle received data
        setReceivedData(data);
        console.log('Received data:', data);
    //   }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

 return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <p>
             {receivedData && (
        <div>
          <h2>Received Data:</h2>
          <pre>{JSON.stringify(receivedData, null, 2)}</pre>
        </div>
      )}
      </p>

      <p>
      {!receivedData && (
        <div>
          <h2>No pickUp requests received</h2>
        </div>
      )}
      </p>
    </div>
    </div>
    </>
 )

}

export default Runner
