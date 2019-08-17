const emailInvite = (host, tableId, inviter) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .inviteContainer {
            width: 450px;
            margin: auto;
            padding: 1rem;
            border: 1px solid black;
            text-align: center;
            background: #ff767b;
        }

        .btn {
            height: 35px;
            width: 100%;
            border: 1px solid grey;
            border-radius: 5px;
            margin: .5rem;
            background: #28a745;
            font-size: 1.1rem;
        }

        .strong {
            font-size: 45px;
        }
    
        p {
            font-size: 30px;
        }
    </style>
</head>
<body>
    <div class="inviteContainer">
        
            <p><strong class="strong">Dex</strong> <em>plan to win</em></p>
            <p>${inviter} has invited you to join table ${tableId}!</p>
            <div>
                <a href="http://${host}/api/invite/${tableId}">
                    <button class="btn yes">ACCEPT</button>
                </a>
                <h3>Or don't</h3>
            </div>
        
    </div>
</body>
</html>`
} 

module.exports = emailInvite;

// subject: `Hi! this is dex team. You are invited by ${invitedBy}`, // Subject line
// html: `\nhttp://${req.headers.host}/api/invite/${tableId}\n`