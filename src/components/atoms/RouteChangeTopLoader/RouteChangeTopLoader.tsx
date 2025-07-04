import React from 'react';
import NextTopLoader from 'nextjs-toploader';

const RouteChangeTopLoader = () => {
  return (
    <>
      <NextTopLoader
        color="#109b4f"
        initialPosition={0.08}
        crawlSpeed={300}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
    </>
  );
};

export default RouteChangeTopLoader;
