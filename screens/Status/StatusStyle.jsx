import { StyleSheet } from "react-native";
import Colors from "../../colors/Colors";

const StatusStyle = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.componentBackground,
        marginTop: 70,
        marginLeft: 20,
    },
    taskButtonView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
        marginBottom:20
    },
    button: {
        backgroundColor: Colors.component, // Background color for the button
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'flex-end', // Align button to the right
    },
    buttonText: {
        fontSize: 18,
        color: Colors.white,
    },
    taskParentBackground: {
        margin: 5, 
        justifyContent: 'center',
    },
    taskBackground: {
        padding: 20,
        backgroundColor: Colors.componentBackground,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        tintColor: Colors.component
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
    taskText: {
        fontSize: 18,
        color: Colors.white, 
    },
    taskDescription: {
        fontSize: 14,
        color: Colors.white, 
        marginVertical: 2,
    },
    taskDate: {
        fontSize: 12,
        color: Colors.white, 
        marginTop: 2,
    },
    
});

export default StatusStyle; 
