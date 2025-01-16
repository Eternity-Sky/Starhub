import React, { useEffect, useState } from 'react';

function Home() {
    const [user, setUser] = useState(null);
    const [clientID, setClientID] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('/api/')
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, []);

    const handleRegister = () => {
        fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clientID, clientSecret })
        })
        .then(res => res.json())
        .then(data => alert(data.message));
    };

    const handleLogin = () => {
        window.location.href = `/api/auth/github?clientID=${clientID}&clientSecret=${clientSecret}`;
    };

    return (
        <div>
            <h1>欢迎来到 Starhub</h1>
            {user ? (
                <div>
                    <p>你好, {user.username}!</p>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="输入你的 Client ID"
                        value={clientID}
                        onChange={e => setClientID(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="输入你的 Client Secret"
                        value={clientSecret}
                        onChange={e => setClientSecret(e.target.value)}
                    />
                    <button onClick={handleRegister}>注册</button>
                    <button onClick={handleLogin}>登录</button>
                </div>
            )}
        </div>
    );
}

export default Home; 