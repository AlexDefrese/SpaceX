import React, { Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
query LaunchesQuery {
    launches{
        flight_number
        name
        date_local
        success
    }
}`;

const Launches = () => {
  return (
    <Fragment>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      <Query query={LAUNCHES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);
          else return <Fragment>
            {
              data.launches.map(launch => (
                <LaunchItem key={launch.flight_number} launch={launch} />
              ))
            }
          </Fragment>;
        }}
      </Query>
    </Fragment>
  );
};

export default Launches