const gql = require('graphql-tag');

module.exports = {
  getPolyMorphsQuery: gql`query($walletAddress:String){
            transferEntities(first: 1000, where: { to:$walletAddress}) {
              tokenId
            }
        }`,
};