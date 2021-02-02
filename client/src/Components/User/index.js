import React from 'react';
import UserLayout from '../../HOC/UserLayout';
import Button from '../utils/Button';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className='user_nfo_panel'>
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <Button 
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>HIstory purchases</h1>
                    <div className="user_product_block_wrapper">
                        history
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserDashboard;