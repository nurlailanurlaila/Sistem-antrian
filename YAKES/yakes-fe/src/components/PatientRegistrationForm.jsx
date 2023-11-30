// React
import { memo, useState, useEffect } from "react";

// Ant Design
import { Form, Input, Button, Row, Col, Modal, Select } from "antd";


const PatientRegistrationForm = memo(() => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const [polis, setPolis] = useState([]);
    const [poli, setPoli] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPoli, setSelectedPoli] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [doctorLoading, setDoctorLoading] = useState(false);
    const [defaultDate, setDefaultDate] = useState('');             //setVariabel default date
    const [responseModalData, setResponseModalData] = useState(null);
    const [doctorPolis, setDoctorPolis] = useState([]); 

    //generate currentDateTime
    const getCurrentDateTime = () => {   
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }; 

    useEffect(() => {
        // Fetch data from your API for Poli
        fetch('http://localhost:8080/api/polis')
            .then(response => response.json())
            .then(data => {
                setPolis(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching polis:', error);
                setLoading(false);
            });
    }, []);

    const handlePoliChange = async value => { //set chance dokter (hide&show) (kolom dokter)
        setSelectedPoli(value);
        setDoctorLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/dokter/poli/${value}`); //hit(nembak) api u/ list dokter by poli
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }

        setDoctorLoading(false);
    };

    // Set nilai default pada mounting komponen
    useState(() => {
        const currentDate = getCurrentDateTime();
        setDefaultDate(currentDate);              //set value current date
    }, []);

    const handleFormSubmit = async (values) => {   //integrasi BE ke FE
        try {
            const response = await fetch('http://localhost:8080/api/pasien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'mode': 'no-cors',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true'
                },
                body: JSON.stringify({
                    nama: values.pasien,
                    dokter_id: values.dokter,
                    nik: values.nik,
                    alamat: values.alamat,
                    bpjs: values.informasiBpjs,
                    phone: values.noKontak
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResponseModalData(data);
                setModalVisible(true);

                // fetch dokter by polis id
                const responseDokter = await fetch(`http://localhost:8080/api/dokter/${values.dokter}`);
                const dataDokter = await responseDokter.json();
                setDoctorPolis(dataDokter);

                // fetch dokter by polis id
                const responsePoli = await fetch(`http://localhost:8080/api/polis/${dataDokter.poli_id}`);
                const dataPoli = await responsePoli.json();
                setPoli(dataPoli);
            } else {
                console.error('Gagal menambahkan data pasien');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }; //Stop integrasi BE ke FE

    return (
        <div style={{
            backgroundColor: '#94EDE2',
            height: '850px'
        }} >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 className="registrasi-pasien" style={{ paddingLeft: '1%' }}>
                    Registrasi Pasien
                </h2>
                <img
                    style={{
                        marginLeft: '71%',
                        marginTop: '1%',
                        width: '200px',
                        height: '55px'
                    }}
                    src="/src/public/logo-yakes.png"
                    alt="logo yakes telkom"
                />

            </div>
            <Form
                name="basic"
                autoComplete="off"
                layout="vertical"
                onFinish={handleFormSubmit}
                style={{
                    paddingLeft: '2%',
                    paddingRight: '2%',
                    paddingTop: '2%',
                    paddingBottom: '2%'
                }}>
                <Row gutter={12}>
                    <Col xs={12}>
                        <Form.Item
                            label="NIK"
                            name="nik"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>

                    <Col xs={12}>
                        <Form.Item
                            label="Tanggal"
                            name="tanggal"
                            initialValue={defaultDate} //menampilkan value default date
                        >
                            <Input readOnly />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col xs={24}>
                        <Form.Item
                            label="Pasien"
                            name="pasien"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col xs={24}>
                        <Form.Item
                            label="Informasi BPJS"
                            name="informasiBpjs"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col xs={24}>
                        <Form.Item
                            label="Alamat"
                            name="alamat"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col xs={24}>
                        <Form.Item
                            label="No. Kontak"
                            name="noKontak"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12}>
                    <Col xs={12}>
                        <Form.Item
                            label="Poli"
                            name="poli"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a poli',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select Poli"
                                loading={loading}
                                onChange={handlePoliChange}
                                value={selectedPoli}
                            >
                                {polis.map(poli => (
                                    <Option key={poli.id} value={poli.id}>
                                        {poli.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    
                    <Col xs={12}>     
                        {selectedPoli && (
                            <Form.Item
                                label="Dokter"
                                name="dokter"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a dokter',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Dokter"
                                    loading={doctorLoading}
                                >
                                    {doctors.map(doctor => (
                                        <Option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                </Row>

                <Form.Item style={{ textAlign: 'right', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Selanjutnya &gt;
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="Kartu Antrian"
                visible={modalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                {responseModalData && (
                    <>
                        <div className="number">
                            {/* Tampilkan informasi dari response */}
                            <p style={{ fontSize: "20px", textAlign: "center" }}>{defaultDate}</p>
                            <p style={{ fontSize: "80px", textAlign: "center", marginTop: "7%", marginBottom: "5%" }}> {responseModalData.nomor_antrian} </p>
                            <p style={{ fontSize: "20px", textAlign: "center", marginTop: "4%" }}>{poli.name}</p>
                        </div>
                        <div>
                            {/* Menampilkan informasi yang diterima */}
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>Waktu : {defaultDate}</p>
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>Nama : {responseModalData.nama}</p>
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>Poli : {poli.name}</p>
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>Dokter : {doctorPolis.name}</p>
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>Kontak : {responseModalData.phone}</p>
                            <p style={{ color: "black", fontSize: "16px", marginTop: "1cm" }}>No antrian : {responseModalData.nomor_antrian}</p>
                        </div>
                        <div className="print" style={{ textAlign: "right" }}>
                            <button onClick={handleModalClose} style={{
                                fontSize: "16px",
                                padding: "8px 16px",
                                marginRight: "10px",
                                backgroundColor: "#FFFFFF",
                                color: "black",
                                borderRadius: "20px",
                                border: "1px solid black"
                            }}>
                                Batal
                            </button>
                            <button style={{
                                fontSize: "16px",
                                padding: "8px 16px",
                                backgroundColor: "#21A3BF",
                                color: "white",
                                border: "none",
                                borderRadius: "20px"
                            }}>
                                Cetak Tiket
                            </button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
});

PatientRegistrationForm.displayName = "PatientRegistrationForm";

export default PatientRegistrationForm;
