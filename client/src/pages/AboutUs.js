import React from 'react'

function AboutUs() {
  return (
    <div>
        <div className = "small-container-aboutus">
       

            <div className = "row-aboutus">
                <div className = "col-aboutus">
                <img src="../images/aboutus.jpg" width = "100%" id = "productImg" alt = ""/>
                </div>

                <div className = "col-aboutus">
                <h1 className = "aboutus-h1">What We Stand For</h1>
                <p className = "aboutus-p" style={{paddingLeft: "40px"}}>At our recipe application, we believe that cooking and eating are not just necessary for survival, but they are also opportunities to connect with others and to experience joy and satisfaction. We stand for providing our users with a platform that inspires them to discover and create delicious, healthy, and affordable meals that suit their unique tastes and dietary needs. We believe in the power of food to bring people together, to break down cultural barriers, and to promote wellbeing. We strive to offer our users a seamless, personalized, and enjoyable experience that simplifies the cooking process, encourages experimentation, and fosters a sense of community. At our recipe application, we are committed to helping our users live better lives through cooking and eating.</p>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className = "row-aboutus">

                <div className = "col-aboutus">
                <h1 className = "aboutus-h1">Our Mission</h1>
                <p className = "aboutus-p"style={{paddingRight: "40px"}}>We are committed to providing our users with a platform that is intuitive, personalized, and enjoyable to use. We are constantly working to curate a wide range of high-quality recipes that cater to different dietary preferences, cooking skill levels, and cultural traditions. Our app features a range of filters and search tools that make it easy to find the perfect recipe for any occasion, whether you're looking for a quick weeknight dinner or an elaborate holiday feast.<br></br>
                In addition to providing a robust collection of recipes, we also strive to foster a sense of community around food. Our recipe application features a range of social features, such as the ability to save and share recipes with others in the platform. Ultimately, our recipe application is designed to help our users live healthier, happier lives by making it easy and fun to discover new recipes, cook with confidence, and share their creations with others. We are constantly evolving and improving our platform based on user feedback, and we are committed to remaining a trusted and valuable resource for anyone who wants to explore the world of cooking and food.</p>
                                          
                </div>

                <div className = "col-aboutus">
                <img src="images/aboutus-2.jpg" width = "100%" id = "productImg" alt = ""/>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            

            <h1 className = "aboutus-h1">Brands Who Believe Us</h1>
            <div className = "row-aboutus">
              
              <div className = "col-3-aboutus">
              <img src="../images/brand-1.png" width = "100%" id = "productImg" alt = ""/>
              </div>
              <div className = "col-3-aboutus">
              <img src="../images/brand-3.png" width = "100%" id = "productImg" alt = ""/>
              </div>
              <div className = "col-3-aboutus">
              <img src="../images/brand-2.png" width = "100%" id = "productImg" alt = ""/>
              </div>
            </div>


        </div>
    </div>
  )
}

export default AboutUs