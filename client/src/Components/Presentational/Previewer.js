import React from 'react';

const Previewer = () => (
    <pre className="previewer little-separated">
            {JSON.stringify({
                "first_name": "Francesco",
                "last_name": "Malatesta",
                "email_address": "francescomalatesta@live.it"
            }, null, 2) }
        </pre>
);

export default Previewer
