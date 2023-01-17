import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';



const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launches(flight_number: $flight_number) {
      flight_number
      name
      launch_year
      success
      date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
    let { flight_number } = useParams();
    flight_number = parseInt(flight_number);
    console.log(flight_number);
  return (
    <Fragment>
        <Query query={ LAUNCH_QUERY } variables={{flight_number}}>
            {
                ({ loading, error, data }) => {
                    if(loading) return <h4>Loading...</h4>
                    if(error) console.log(error, JSON.stringify(error, null))
                    const {  name, flight_number, launch_year, success, rocket:{ rocket_id, rocket_name, rocket_type} } = data.launches;
                    console.log(data.launches);
                    return <div>
                        <h1 className="display-4 my-3"><span className='text-dark'>Mission:</span> { name }</h1>
                        <h4 className="mb-3">Launch Details:</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Flight Number: {flight_number}
                            </li>
                            <li className="list-group-item">
                                Launch Year: {launch_year}
                            </li>
                            <li className="list-group-item">
                                Launch Successful: <span className={classNames({
                                    'text-success': success,
                                    'text-danger': !success
                                })}>{success ? 'Yes' : 'No'}</span>
                            </li>
                        </ul>
                        <h4 className="my-3">Rocket Details</h4>
                        <ul className="list-group">
                            <li className="list-group-item">Rocket ID: {rocket_id}</li>
                            <li className="list-group-item">Rocket Name: {rocket_name}</li>
                            <li className="list-group-item">Rocket Type: {rocket_type}</li>
                        </ul>
                        <hr />
                        <Link to='/'className='btn btn-secondary'>Back</Link>
                    </div>;
                }
            }
        </Query>
    </Fragment>
  )
}

export default Launch