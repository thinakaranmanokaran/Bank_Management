import React from 'react';
import { NavLink } from 'react-router-dom';
import EmployeeNavigation from '../../database/empolyee/Navigation';

const Navigation = () => {
    return (
        <div className='bg-dark py-6 rounded-4xl min-w-66 flex flex-col '>
            {
                EmployeeNavigation.map((Data, index) => (
                    <NavLink
                        key={index}
                        to={Data.link}
                        className={({ isActive }) =>
                            `px-8 py-4 font-main text-lg transition-all duration-300 
                            ${isActive ? 'bg-green text-dark' : 'hover:bg-green hover:text-dark hover:px-12'}`
                        }
                    >
                        {Data.title}
                    </NavLink>
                ))
            }
        </div>
    );
}

export default Navigation;
