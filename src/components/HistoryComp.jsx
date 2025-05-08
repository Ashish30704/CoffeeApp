import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import colors from '../utils/colors';
import { sizes, fonts } from '../utils/texts';
import { horizonPadding, smallIconDim } from '../utils/dimensions';
import HistorySize from './HistorySize';
import { useSelector } from 'react-redux';

const date = new Date();
const formatteddate = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'long',
  hour: '2-digit',
  minute: 'numeric',
}).format(date);

const HistoryComp = ({itemImage, itemName, itemSize, itemIngredient, itemTotalPrice, ItemId}) => {

  return (
    <View>    
        <View style={{marginBottom: horizonPadding(1), paddingHorizontal: horizonPadding(0.1)}}>
          
        </View>
        <View
          style={{
            backgroundColor: colors.color4,
            borderRadius: 20,
            padding: horizonPadding(1),
            gap: horizonPadding(1)
          }}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <Image
              source={itemImage}
              style={{
                height: smallIconDim(4.5, 2).height,
                width: smallIconDim(2, 4.5).width,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'column',}}>
                <Text
                  style={{
                    color: colors.color7,
                    fontSize: sizes.size3,
                    fontFamily: fonts,
                  }}>
                  {itemName}
                </Text>
                <Text style={{color: colors.color7, fontSize: sizes.size5, fontWeight: 600}}>
                  {itemIngredient}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: colors.color2,
                    fontSize: sizes.size2,
                    fontWeight: 600,
                  }}>
                  {'$ '}
                </Text>
                <Text
                  style={{
                    color: colors.color7,
                    fontSize: sizes.size2,
                    fontWeight: 600,
                  }}>
                  {itemTotalPrice}
                </Text>
              </View>
            </View>
          </View>
          {
            itemSize.map((item, index) => (
                <HistorySize key={index} itemPrice={item.price} itemQuantity={item.quantity} itemSize={item.size}/>
            ))
          }
        </View>
        </View>
  )
}

export default HistoryComp

const styles = StyleSheet.create({})