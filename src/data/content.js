// ============================================================
// EDIT DATA DI SINI SESUAI PROFIL KAMU
// ============================================================

export const profile = {
  name: 'Your Name',           // Ganti dengan nama kamu
  title: 'Polymath Engineer',
  tagline: 'Building the Future Across Every Layer',
  subtitle: 'Mechanic · Electrical · IoT · Software · Hardware · Embedded · Robotics · 3D',
  description:
    'Seorang engineer yang memadukan dunia fisik dan digital — dari rangkaian elektronik hingga kode, dari desain 3D hingga sistem robotik yang cerdas.',
  location: 'Open to Remote & On-site',
  email: 'nozanwork@gmail.com',
  linkedin: 'linkedin.com/in/naufal-auzan-ramadhan-312988378',
  github: 'github.com/nojanzzz',
  availableForWork: true,
};

export const skills = [
  {
    icon: '⚙️',
    name: 'Mechanical Engineering',
    desc: 'Perancangan komponen, toleransi material, analisis struktur, dan prototipe fisik.',
    level: 90,
  },
  {
    icon: '⚡',
    name: 'Electrical Engineering',
    desc: 'Desain PCB, analisis rangkaian, power management, dan sistem kontrol.',
    level: 88,
  },
  {
    icon: '📡',
    name: 'IoT Systems',
    desc: 'Arsitektur IoT end-to-end, protokol MQTT/HTTP, cloud integration, sensor networks.',
    level: 85,
  },
  {
    icon: '💻',
    name: 'Software Development',
    desc: 'Backend, frontend, API design, database, dan deployment pipeline.',
    level: 82,
  },
  {
    icon: '🔩',
    name: 'Hardware Design',
    desc: 'Schematic design, component selection, hardware bring-up, dan testing.',
    level: 87,
  },
  {
    icon: '📟',
    name: 'Embedded Systems',
    desc: 'Firmware C/C++, RTOS, bare-metal programming, STM32/ESP32/AVR.',
    level: 90,
  },
  {
    icon: '🤖',
    name: 'Robotics',
    desc: 'Kinematika, kontrol motor, computer vision, ROS, dan autonomous navigation.',
    level: 84,
  },
  {
    icon: '🧊',
    name: '3D Design & Printing',
    desc: 'CAD modeling, parametric design, FDM/SLA printing, dan reverse engineering.',
    level: 86,
  },
];

export const projects = [
  {
    icon: '🤖',
    type: 'ROBOTICS',
    title: 'Autonomous Line Follower Robot',
    desc: 'Robot otonom dengan sensor array, PID controller, dan kemampuan navigasi adaptif tanpa remote control.',
    stack: ['C++', 'STM32', 'PID', 'Sensor Fusion'],
    link: '#',
  },
  {
    icon: '📡',
    type: 'IoT',
    title: 'Smart Agriculture Monitor',
    desc: 'Sistem monitoring pertanian berbasis IoT dengan sensor suhu, kelembaban, dan pH tanah real-time.',
    stack: ['ESP32', 'MQTT', 'Node.js', 'Grafana'],
    link: '#',
  },
  {
    icon: '🧊',
    type: '3D + MECHANICAL',
    title: 'Custom Robotic Arm 6-DOF',
    desc: 'Desain lengan robotik 6 sumbu kebebasan dengan mekanisme custom-printed dan motor servo closed-loop.',
    stack: ['SolidWorks', 'PLA+', 'Arduino', 'Inverse Kinematics'],
    link: '#',
  },
  {
    icon: '⚡',
    type: 'ELECTRICAL',
    title: 'Smart Power Distribution Unit',
    desc: 'PDU cerdas dengan monitoring arus real-time, proteksi otomatis, dan remote control via app.',
    stack: ['KiCad', 'STM32', 'OLED', 'BLE'],
    link: '#',
  },
  {
    icon: '💻',
    type: 'SOFTWARE',
    title: 'Embedded RTOS Dashboard',
    desc: 'Web dashboard untuk monitoring sistem embedded berbasis RTOS dengan live telemetry dan alerting.',
    stack: ['React', 'WebSocket', 'InfluxDB', 'FreeRTOS'],
    link: '#',
  },
  {
    icon: '🔩',
    type: 'HARDWARE',
    title: 'Custom Flight Controller',
    desc: 'Flight controller dari scratch untuk drone FPV racing dengan IMU fusion dan blackbox logging.',
    stack: ['STM32F7', 'IMU', 'Betaflight', 'PCB Custom'],
    link: '#',
  },
];
