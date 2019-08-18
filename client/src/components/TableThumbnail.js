import React from 'react'

export default function TableThumbnail(props) {
  const colors = ['#b920bd', '#0d01ff', '#e05518', '#15cd08', '#010101', '#bc1f25'];
  return (
    <div className = 'hoverCard'>
      <div style = {{fontSize: '20px', fontWeight: 'bold'}}>{props.tableName}</div>
      <div className = 'front' style = {{position: 'absolute', paddingRight: '40px', width: '150px', height: '200px', backgroundSize: '100% 100%', backgroundImage: `url(/assets/cardBack${(props.index % 5)+1}.png)`}}></div>
      <div className = 'back' style = {{position: 'absolute', paddingRight: '40px', width: '150px', height: '200px', color: 'white', backgroundColor: `${colors[(props.index % 5)]}`}}>
        <div style = {{display: 'flex', height: '200px', paddingLeft: '20px', alignItems: 'center', fontSize: '20px'}}>3 cards in table</div>
      </div>
    </div>
    
  )
}
