const invite = (host, tableId) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            display: grid;
            place-items: center;
        }
        .btn {
            height: 40px;
            width: 80px;
            border: 1px solid grey;
            margin: .5rem;
        }

        .yes {
            background: #00da00;
        }

        .no {
            background: #ff4949;
        }

        .yes:hover, .no:hover {
            cursor: pointer;
        }

        p {
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p><strong>Dex</strong> win at planning</p>
    <h2>user has invited you to join table name</h2>
    <div>
        <a href="http://${host}/api/invite/${tableId}">
            <button class="btn yes">accept</button>
        </a>
        <button class="btn no">no</button>
    </div>
</body>
</html>`
} 

module.exports = invite;

// subject: `Hi! this is dex team. You are invited by ${invitedBy}`, // Subject line
// html: `\nhttp://${req.headers.host}/api/invite/${tableId}\n`