import React from 'react';
import './index.scss';
import MetaBallsCanvas from 'components/MetaBallsCanvas';

function Metaverse() {
  return (
    <>
      <div className="metaballs">
        <MetaBallsCanvas />
      </div>
      <div className="Metaverse">
        <main>
          <h1>Enter the Metaverse</h1>
          <p>
            Dive into the <a href="./metaverse">Lambda Metaverse</a> - a digital realm where exploration meets opportunity.
            <br />
            Complete quests, build your space, and engage with others to earn exclusive <a href="./metaverse">NFTs</a> that carry value beyond the virtual world.
          </p>
          <p>
            No experience needed. Just curiosity, creativity, and a digital wallet.
          </p>
          <div className="apply-btn">
            <button type="button">Apply Now</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Metaverse;
