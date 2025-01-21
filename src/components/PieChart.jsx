import React from 'react'
import Plot from 'react-plotly.js'

const PieChart = ({values,labels})=> {

  return (
    <Plot 
    data={[
        {
            type:'pie',
            values:values,
            labels:labels,
            textinfo:'label+percent',
            textposition:'outside',
            automargin:'true'

    },
]}
layout={{
    title: "covid cases of India",
    showlegend:'true',
    margin:{t:50,l:50,r:50,b:50},
}}
style={{width:'100%',height:'100%'}}
config={{responsive:true}}
    />
  )
}

export default PieChart