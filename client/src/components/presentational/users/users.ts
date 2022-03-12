import {button, div, h, table as table_, tbody, th, tr} from 'react-hyperscript-helpers'
import './users.less'
import {horizontalContainer, view} from "../../framework";
import Select from "react-select";
import {map} from "lodash-es";
import {ReactNode} from "react";


const createUserRow = (record: ReactNode[]) =>
    div('.row',
        [
            tr(
                map(
                    Object.values(record),
                    (x, i) => th(
                        [
                            div(
                                [x]
                            )
                        ]
                    )
                )
            )
        ]
    )


const Users = (props) => {
    console.log(props.users)
    return view([
        horizontalContainer([
            h(
                Select,
                {
                    multi: true,
                    name: "filters",
                    value: props.filteredByCountries["value"],
                    options: props.countries,
                    onChange: (event) => {
                        props.filterByCountry({filteredByCountries: event})
                    }
                }
            ),
            button(
                {
                    onClick: () => props.getUsers()
                },
                ["Reload.."]
            )
        ]),
        table_([
            tbody(
                map(props.users,
                    (record) => createUserRow(
                        record
                    )
                )
            )
        ])
    ])
}

export default Users