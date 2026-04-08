import { useState, type ReactNode } from 'react';
import DecryptedText from './DecryptedText';

interface Props {
  children?: ReactNode;
}

export default function AboutText({ children }: Props) {
  const [showBody, setShowBody] = useState(false);

  return (
    <>
      <h2>
        <span className="i18n-pt">
          <DecryptedText
            text="Sobre mim"
            animateOn="view"
            sequential={true}
            speed={80}
            viewThreshold={1}
            onAnimationEnd={() => setShowBody(true)}
          />
        </span>
        <span className="i18n-en" style={{ display: 'none' }}>About me</span>
      </h2>
      <div className="about-grid">
        {children}
      </div>
    </>
  );
}
