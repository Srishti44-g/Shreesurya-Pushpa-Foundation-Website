<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendEmail($subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // Change this to your email
        $mail->Password = 'your-app-specific-password'; // Use Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('your-email@gmail.com', 'Shreesurya Pushpa Foundation');
        $mail->addAddress('info@ShreesuryaPushpaFoundation.in');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $formType = $_POST['form_type'] ?? '';
    $redirect = 'index.html#contact';
    
    switch($formType) {
        case 'contact':
            $body = "Contact Form Submission<br>" .
                   "Name: " . htmlspecialchars($_POST['name']) . "<br>" .
                   "Email: " . htmlspecialchars($_POST['email']) . "<br>" .
                   "Phone: " . htmlspecialchars($_POST['phone']) . "<br>" .
                   "Message: " . htmlspecialchars($_POST['message']);
            $success = sendEmail("New Contact Form Submission", $body);
            $redirect = 'index.html#contact';
            break;
            
        case 'volunteer':
            $body = "Volunteer Form Submission<br>" .
                   "Name: " . htmlspecialchars($_POST['name']) . "<br>" .
                   "Email: " . htmlspecialchars($_POST['email']) . "<br>" .
                   "Phone: " . htmlspecialchars($_POST['phone']) . "<br>" .
                   "Skills: " . htmlspecialchars($_POST['skills']) . "<br>" .
                   "Availability: " . htmlspecialchars($_POST['availability']);
            $success = sendEmail("New Volunteer Application", $body);
            $redirect = 'volunteer.html';
            break;
            
        case 'visit':
            $body = "Visit Schedule Request<br>" .
                   "Name: " . htmlspecialchars($_POST['name']) . "<br>" .
                   "Email: " . htmlspecialchars($_POST['email']) . "<br>" .
                   "Phone: " . htmlspecialchars($_POST['phone']) . "<br>" .
                   "Preferred Date: " . htmlspecialchars($_POST['preferred_date']) . "<br>" .
                   "Preferred Time: " . htmlspecialchars($_POST['preferred_time']);
            $success = sendEmail("New Visit Schedule Request", $body);
            $redirect = 'donate.html';
            break;
    }
    
    // Handle both AJAX and regular form submissions
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
        header('Content-Type: application/json');
        echo json_encode(['success' => $success]);
    } else {
        header("Location: $redirect" . ($success ? "?success=1&formType=$formType" : "?error=1"));
    }
    exit();
}
?>
