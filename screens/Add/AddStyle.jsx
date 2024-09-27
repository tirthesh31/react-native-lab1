import { StyleSheet } from "react-native"
import Colors from "../../colors/Colors";

const AddStyle = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.componentBackground,
        marginTop: 70,
        marginLeft: 20,
    },
    container: {
        backgroundColor: Colors.componentBackground, // Set your desired component background color
        padding: 20,
        margin: 10,
        borderRadius: 10, // Optional: for rounded corners
      },
      input: {
        backgroundColor: '#FFFFFF', // Off-white background for input fields
        padding: 15,
        marginVertical: 10,
        fontSize: 16,
        borderRadius: 5,
        borderColor: '#CCCCCC', // Optional: border color
        borderWidth: 1, // Optional: border width
      },
      picker: {
        backgroundColor: '#FFFFFF', // Off-white background for the Picker
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
      },
      button: {
        backgroundColor:Colors.component, // Background color for the button
        padding: 15,
        borderRadius: 5,
        alignSelf: 'flex-end', // Align button to the right
      },
      buttonText: {
        color: '#FFFFFF', // White text color for the button
        fontSize: 16,
        textAlign: 'center',
      },
});

export default AddStyle;