import React, { Component } from "react";
import PropTypes from 'prop-types';

// const user = {
//     "user_id": "dc02dee1-8fb6-48ba-b4bc-83e945e8dda4",
//     "first_name": "Worden",
//     "last_name": "Nyssen",
//     "email": "wnyssen1@fema.gov",
//     "phone": "700-654-6122",
//     "image": "https://robohash.org/veritatisdictavoluptas.bmp",
//     "profession": "Geologist IV",
//     "bio": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
// };

export default function GroupList({ user }) {
    return (
        <div className="user-list">
            <div className="row no-gutters">
                <div className="col-3">
                    <img src={user.image} className="img-fluid rounded-circle" alt="Manager" />
                </div>
                <div className="col-9 padding-y-15">
                    <h5>{user.first_name} {user.last_name} {user.profession ? `| ${user.profession}`: null}</h5>
                    <p className="padding-r-10">Boi: {user.bio}</p>
                </div>
            </div>
        </div>
    )
}

GroupList.defaultProps = {
    image: '/manager.png',
    bio: 'N/A'
}