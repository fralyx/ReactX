import React from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Animated,
  Easing,
  Image
} from 'react-native'
import { Spinner, Container } from 'native-base'
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_ROCKET_DETAILS } from '../../models/queries/rockets'

import ModelView from 'react-native-gl-model-view'
import { rocketImage } from './Rockets'

const RocketDetails = (props: any) =>
{
  const rocketID = props.navigation.state.params.rocketID
  const AnimatedModelView = Animated.createAnimatedComponent(ModelView)
  
  return (
    <Query
      query={GET_ROCKET_DETAILS}
      variables={{ rocket_id: rocketID }}
    >
      {
        (res: any) =>
        {
          if(res.loading && !res.data)
            return (
              <View style={styles.loadingContainer}>
                <View style={styles.loadStatus}>
                  <Spinner color='blue'/>
                </View>
              </View>
            )

          const item = res.data.rocket
          const isActive = item.isActive === 'true' ? 'Yes': 'No'
          return (
            <ScrollView>
              <Container style={styles.container}>
                <Image
                  source={rocketImage(item.rocket_id)}
                  resizeMode='cover'
                  width={D_WIDTH}
                  height={D_WIDTH}
                />
                <Text style={styles.itemText}>Rocket Name: {item.rocket_name}</Text>
                <Text style={styles.itemText}>Is Active: {isActive}</Text>
                <Text style={styles.itemText}>First Flight: {item.first_flight}</Text>
                <Text style={styles.itemText}>Company: {item.company}</Text>
                <Text style={styles.itemText}>Country: {item.country}</Text>
                <Text style={styles.itemText}>Success Rate PCT: {item.success_rate_pct}</Text>
                <Text style={styles.itemText}>Cost per Launch: {item.cost_per_launch}</Text>
                <Text style={styles.itemText}>Boosters: {item.boosters}</Text>
                <Text style={[styles.itemText, item.description ? styles.descriptionText : styles.errorText]}>
                  Description: {item.description}
                </Text>

                {/* <ModelView
                  model={{
                    uri: '../../models/3d/falcon9.obj',
                  }}
                  // texture={{
                  //   uri: 'texture.png',
                  // }}
                  scale={0.01}
                  translateZ={-2}
                  rotateZ={270}
                  style={{ flex: 1 }}
                /> */}
              </Container>
            </ScrollView>
          )
        }
      }
    </Query>
  )
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
  },
  loadingContainer:
  {
    flex: 1,
    width: D_WIDTH
  },
  loadStatus:
  {
    display: 'flex',
    alignItems: 'center',
    marginTop: D_HEIGHT / 2,
    transform:
    [
      { translateY: -D_HEIGHT / 12.5 }
    ]
  },
  headerText:
  {
    fontSize: 30,
    marginTop: 30,
  },
  itemText:
  {
    marginBottom: 10,
    fontSize: 20
  },
  errorText:
  {
    fontSize: 20,
    fontWeight: '500',
    color: 'red'
  },
  descriptionText:
  {
    color: 'green',
  }
})

RocketDetails.navigationOptions = ({ navigation }) => (
{
  title: 'Rocket Details',
})

export default RocketDetails