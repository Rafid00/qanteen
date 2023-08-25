import React from 'react'

function NutritionCircle(props) {
  return (
    <div class="nutritional-circle">
        <svg class="nutritional-circle__gray" viewBox="0 0 36 36">
          <circle class="nutritional-circle__gray-circle" cx="18" cy="18" r="15.9155"></circle>
          <text x="18" y="20.5" class="nutritional-circle__percentage">{props.name}</text>
          <text x="18" y="25" class="nutritional-circle__label">{props.value}</text>
        </svg>
      </div>
  )
}

export default NutritionCircle