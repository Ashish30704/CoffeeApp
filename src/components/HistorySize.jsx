import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { horizonPadding, smallIconDim } from '../utils/dimensions'
import { sizes } from '../utils/texts'

const HistorySize = ({itemSize, itemPrice, itemQuantity}) => {
  return (
    <View style={styles.container}>
        <View style={{flex: 3, gap: 2, flexDirection: 'row'}}>
            <View style={[styles.size, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10,}]}>
                <View>
                    <Text style={{color: colors.color7, fontSize: sizes.size4, fontWeight: 600}}>
                        {itemSize}
                    </Text>
                </View>
            </View>
            <View style={[styles.size, {borderTopRightRadius: 10, borderBottomRightRadius: 10,}]}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{color: colors.color2, fontSize: sizes.size3, fontWeight: 600}}>
                        ${' '}
                    </Text>
                    <Text style={{color: colors.color7, fontSize: sizes.size3, fontWeight: 600}}> 
                        {itemPrice}
                    </Text>
                </View>
            </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={{color: colors.color2, fontSize: sizes.size3, fontWeight: 600}}>
                X{' '}
            </Text>
            <Text style={{color: colors.color7, fontSize: sizes.size3, fontWeight: 600}}>
                {itemQuantity}
            </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{color: colors.color2, fontSize: sizes.size3, fontWeight: 600}}>
                {itemPrice * itemQuantity}
            </Text>
        </View>
    </View>
  )
}

export default HistorySize

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: smallIconDim(2.5, 2).height,
    },
    size: {
        flexDirection: 'row',
        backgroundColor: colors.color3,
        // flex: 1, 
        alignItems: 'center',
        paddingHorizontal: horizonPadding(1.5),
        justifyContent: 'center'
    },
})