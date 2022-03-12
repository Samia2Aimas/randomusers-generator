import {h} from 'react-hyperscript-helpers'
import {connect} from 'react-redux'
import {action as userActions} from 'common/store/users'
import Users from "../presentational/users/users";
import {useEffect} from "react";
import {chain, map} from "lodash-es";


interface Prop {
    getUsers: typeof userActions.getUsersStarted
    filterByCountry: typeof userActions.filterByCountry
    users: []
    filteredByCountries: []
}

const filterByCountry = (filterValue) =>
    (users: []) => {

        if (users !== undefined) {
            debugger
            return filterValue.filteredByCountries == undefined ?
                users :
                users.filter((item: any) => {
                    debugger
                    return item.name == filterValue.filteredByCountries.value
                })
        }
    }


const useFetching = actionCreator => {
    useEffect(() => {
        actionCreator();
    }, [])
}

const UsersContainer = (props: Prop) => {
    useFetching(props.getUsers)
    const countries = (users) => map(users, (item: any) => ({
        value: item.name,
        label: item.name
    }))
    const usersProfile = (users) => chain(users)
        .map((item) => Object.values(item.users))
        .flatten()
        .value()
    return h(
        Users,
        {
            countries: countries(props.users),
            users: usersProfile(filterByCountry(props.filteredByCountries)(props.users)),
            filteredByCountries: props.filteredByCountries,
            filterByCountry: props.filterByCountry,
            getUsers: props.getUsers
        }
    )
}


const mapStateToProps = (state) => ({
    users: state.users.randomUsers,
    filteredByCountries: state.users.filteredByCountries

})


const mapDispatchToProps = {
    getUsers: userActions.getUsersStarted,
    filterByCountry: userActions.filterByCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
