import { StyleSheet } from "react-native";
import Colors from "../../colors/Colors";

const HomeStyle = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.componentBackground,
        marginTop: 70,
        marginLeft: 20,
        marginBottom:20
    },
    taskParentBackground: {
        margin: 5, // You can reduce this if you want to bring tasks closer to the header
        justifyContent: 'center',
        //paddingTop: 0,
    },
    taskBackground: {
        padding: 20,
        backgroundColor: Colors.componentBackground,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskText: {
        flex: 1, // Allows text to take up available space
        color: 'white', // Optional: Adjust color based on your design
        fontSize: 18,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: Colors.component,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        backgroundColor: Colors.component,
        paddingHorizontal: 65,
        marginTop: 2.5,
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white,
    },
    bullet: {
        width: 20,        
        height: 20,       
        borderRadius: 5,  
        marginRight: 10,  
    },
});

export default HomeStyle;
