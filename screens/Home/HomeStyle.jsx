import { StyleSheet } from "react-native";
import Colors from "../../colors/Colors";

const HomeStyle = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.componentBackground,
        marginTop: 70,
        marginLeft: 20,
    },
    taskParentBackground: {
        padding: 20,
        marginTop: 20,
        justifyContent: 'center',
        paddingTop: 0,
    },
    taskBackground: {
        padding: 20,
        marginTop: 20,
        backgroundColor: Colors.componentBackground,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Ensures space between task text and buttons
    },
    taskText: {
        flex: 1, // Allows text to take up available space
        color: 'white', // Optional: Adjust color based on your design
        fontSize:18
    },
    icon: {
        width: 30,
        height: 30,
        tintColor:Colors.component
    },
    buttonContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    actionButton: {
        backgroundColor:Colors.component,
        paddingHorizontal:65,
        marginTop:2.5,
        paddingVertical:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    buttonText: {
        fontSize:18,
        color:Colors.white
    }
});

export default HomeStyle;
