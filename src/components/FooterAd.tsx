import React from 'react';

export function FooterAd() {
  React.useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <div style={adWrapperStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1140927244903537"
        data-ad-slot="3577758751"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export const adWrapperStyle = {
  width: '100%',
};
