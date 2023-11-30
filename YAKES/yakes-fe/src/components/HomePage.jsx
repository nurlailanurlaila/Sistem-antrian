// React
import { memo } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

const HomePage = memo(() => {
    const navigate = useNavigate();
    
    return (
        <div style={{
            backgroundColor: '#94EDE2',
            
        }} >
            <img src="/src/public/logo-yakes.png"
                 alt="logo yakes telkom"
                 style={{
                    marginLeft: '81.55%',
                    marginTop: '1%',
                    width: '16%',
                    height: '12%'
                 }}
            />

            <h1 style={{
                color: '#0593b3',
                textAlign: 'center',
                height: '5mm',
                fontSize: '2.5em',
                fontFamily: 'sans-serif'
            }}>Selamat Datang di</h1>
            <h1 style={{
                color: '#0593b3',
                textAlign: 'center',
                height: '5mm',
                fontSize: '2.5em',
                fontFamily: 'sans-serif'
            }}>Klinik Pratama Yakes Telkom</h1>
            <h1 style={{
                color: '#0593b3',
                textAlign: 'center',
                height: '5mm',
                marginTop: '1%',
                fontSize: '2.5em',
                fontFamily: 'sans-serif'
            }}>(JL. Sentot Alibasyah)</h1>

            <br />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5%',
                marginBottom: '0.5%'
            }}>
                <button
                    onClick={() => navigate("/form-submit")}
                    style={{
                        height: '2.5em',
                        width: '10em',
                        backgroundColor: '#0593b3',
                        borderRadius: '8px',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5em',
                        marginTop: '1%',
                        fontFamily: 'sans-serif'
                    }}
                >
                    <b>Registrasi Pasien</b>
                </button>
            </div>

            <br />
            <img
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: '15%',
                    marginTop: '1%',
                    width: '70%',
                    marginBottom: '20px'
                }}
                src="/src/public/gambar_antrian.jpeg"
                alt="Antrian"  />
        </div>
    );
});

HomePage.displayName = "HomePage";

export default HomePage;
