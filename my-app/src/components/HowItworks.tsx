// import React from 'react';
// import Illustration from '../images/photo1.png'
// import blob from '../images/blob-haikei.png'

// const HowItWorks = () => {
//   const steps = [
//     { id: 1,img:{blob} ,text: 'Зарегистрируйтесь', position: { top: '-50px', left: '50%' } },
//     { id: 2, text: 'Создайте задачу', position: { top: '50%', left: '-150px' } },
//     { id: 3, text: 'Следите за прогрессом', position: { top: '50%', right: '-340px' } },
//     { id: 4, text: 'Получите результат', position: { bottom: '-50px', left: '50%' } },
//   ];

//   return (
//     <section style={styles.container}>
//       <div style={styles.illustrationContainer}>
//         <img src={Illustration} alt="Как это работает" style={styles.illustration} />
//         {steps.map((step) => (
//           <div
//             key={step.id}
//             style={{ ...styles.step, ...step.position }}
//           >
//             <span style={styles.stepNumber}>{step.id}</span>
//             {/* <img src={blob} alt="" /> */}
//             <p style={styles.stepText}>{step.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// const styles = {
//   container: {
//     position: 'relative',
//     width: '100%',
//     height: '500px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white'
//   },
//   illustrationContainer: {
//     position: 'relative',
//     width: '300px',
//     height: '300px',
//   },
//   illustration: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
//   },
//   step: {
//     position: 'absolute',
//     transform: 'translate(-50%, -50%)',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   stepNumber: {
//     backgroundColor: '#FFF',
//     color: '#000',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     borderRadius: '50%',
//     width: '30px',
//     height: '30px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '5px',
//   },
//   stepText: {
//     textAlign: 'center',
//     fontSize: '16px',
//     color: '#333',
//   },
// };

// export default HowItWorks;
import React from 'react'

const HowItworks = () => {
  return (
    <div>HowItworks</div>
  )
}

export default HowItworks