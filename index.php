<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Joseph.Cape
 * Date: 26/07/13
 * Time: 17:37
 * To change this template use File | Settings | File Templates.
 */
require_once('../../config.php');

global $OUTPUT, $PAGE, $CFG;

$PAGE->set_context(context_system::instance());

$PAGE->set_url($CFG->wwwroot . '/local/simpleajax_form/index.php');

$jsarguments = array();

$jsmodule = array(
    'name'     	=> 'ilp_ajax_addnew',
    'fullpath' 	=> '/local/simpleajax_form/simpleajax_form.js',
    'requires'  	=> array('io','io-form', 'json-parse', 'json-stringify', 'json', 'base', 'node')
);

$PAGE->requires->js_init_call('M.simpleajax_form.init', $jsarguments, true, $jsmodule);

echo $OUTPUT->header();

echo html_writer::tag('span', 'Click to generate form', array(
    'class'=>'clickme',
    'data-url'=> $CFG->wwwroot . '/local/simpleajax_form/simpleajax_form_generator.php'
    ));

echo html_writer::tag('div', '', array(
    'class'=>'formarea'
    ));

echo html_writer::tag('div', '', array(
    'class'=>'newoutput-container'
));

echo $OUTPUT->footer();

?>