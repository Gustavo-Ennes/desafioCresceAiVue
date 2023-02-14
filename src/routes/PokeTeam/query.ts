const teamsQuery: string = `
query{
  getTeams{
    id
    name
    slot1
    slot2
    slot3
    slot4
    slot5
    slot6
  }
}
`;

const deleteTeamMutation = (id: string) => `
mutation{
  deleteTeam(id: "${id}")
}
`;

const createTeamMutation = ({
  name,
  slot1,
  slot2,
  slot3,
  slot4,
  slot5,
  slot6,
}: any) => `
mutation{
  createTeam(
    pokeTeamInput: {
      name:  "${name}"
      slot1: ${slot1}
      slot2: ${slot2}
      slot3: ${slot3}
      slot4: ${slot4}
      slot5: ${slot5}
      slot6: ${slot6}
    }
  ){
    id
    name
    slot1
    slot2
    slot3
    slot4
    slot5
    slot6
  }
}
`;

export { teamsQuery, deleteTeamMutation, createTeamMutation };
