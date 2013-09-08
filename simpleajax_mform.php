<?php
defined('MOODLE_INTERNAL') || die();

require_once("$CFG->libdir/formslib.php");

class simpleajax_form extends moodleform {

    public function definition() {
        global $CFG;

        $mform = $this->_form; // Don't forget the underscore!

        $mform->addElement('text', 'email', get_string('email')); // Add elements to your form
        $mform->setType('email', PARAM_NOTAGS);                   //Set type of element
        $mform->setDefault('email', 'Please enter email');        //Default value
        $this->add_action_buttons();
    }

    function validation($data, $files) {
        return array();
    }
}