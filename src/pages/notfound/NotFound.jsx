import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import penguinGif from '/src/assets/walking-penguin.gif'; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      ...styles.container,
      backgroundImage: `url(${penguinGif})`
    }}>
      <div style={styles.overlay}>
        
        <div style={styles.content}>
          <div style={styles.arcContainer}>
            <svg viewBox="0 0 500 120" style={styles.svgArc}>
              <path id="textCurve" d="M50,110 Q250,10 450,110" fill="transparent" />
              <text style={styles.captionStyle}>
                <textPath xlinkHref="#textCurve" startOffset="50%" textAnchor="middle">
                  BUT WHY?
                </textPath>
              </text>
            </svg>
          </div>

          <div style={styles.errorCodeContainer}>
            <svg viewBox="0 0 800 220" style={styles.svgErrorCode}>
              <text x="400" y="180" textAnchor="middle" style={styles.errorCodeStyle}>
                404
              </text>
            </svg>
          </div>
          
          <div style={styles.btnSection}>
            <Button 
              type="ghost" 
              size="large" 
              onClick={() => navigate('/')}
              style={styles.mainBtn}
            >
              <svg viewBox="0 0 600 100" style={styles.svgButtonText}>
                <text x="300" y="65" textAnchor="middle" style={styles.buttonTextStyle}>
                  BACK TO THE COLONY
                </text>
              </svg>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#05070a',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '25% center', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  overlay: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: '100%',
    maxWidth: '800px',
  },
  arcContainer: {
    width: '400px',
    marginBottom: '-20px',
  },
  svgArc: {
    overflow: 'visible',
    width: '100%',
  },
  errorCodeContainer: {
    width: '500px',
    margin: '0',
  },
  svgErrorCode: {
    overflow: 'visible',
    width: '100%',
  },
  btnSection: {
    marginTop: '60px',
  },
  svgButtonText: {
    overflow: 'visible',
    width: '100%',
    height: '100%',
  },
  captionStyle: {
    fontSize: '56px',
    fontWeight: '900',
    fill: '#fff',
    stroke: '#000',
    strokeWidth: '1.5px',
    letterSpacing: '6px',
    textTransform: 'uppercase',
  },
  errorCodeStyle: {
    fontSize: '200px',
    fontWeight: '900',
    fill: '#fff',
    stroke: '#000',
    strokeWidth: '3.5px',
    letterSpacing: '-8px',
  },
  buttonTextStyle: {
    fontSize: '40px',
    fontWeight: '800',
    fill: '#fff',
    stroke: '#000',
    strokeWidth: '1.5px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  mainBtn: {
    height: '65px',
    minWidth: '320px',
    padding: '0 40px',
    borderRadius: '4px',
    fontSize: '0px',
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2px',
  },
};

export default NotFound;