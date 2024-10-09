using LucyCover___Backend.Exceptions;
using MailKit.Net.Imap;
using MailKit.Net.Smtp;
using MimeKit;
using System.Text.RegularExpressions;

namespace LucyCover___Backend.Services
{
    public interface IEmailService 
    {
          public Task SendEmailAsync(IEmailMessage toSendEmail, string? fileName=null);
          public Task<List<MimeMessage>> ReciveEmailsAsync(string? fromAddress = null); 
    }
    public interface IEmailMessage 
    {
        public string email { get;set; }
        public string subject { get; set; }
        public string message { get; set; }
    }
    public class EmailService:IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmailService(IConfiguration configuration,IWebHostEnvironment webHostEnvironment)
        {
            _configuration = configuration;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task SendEmailAsync(IEmailMessage toSendEmail, string? fileName=null)
        {
           MimeMessage email = new MimeMessage();
           email.From.Add(new MailboxAddress("LucyCover",_configuration["Smtp:Username"]));
           email.To.Add(new MailboxAddress("",toSendEmail.email));
           email.Subject = toSendEmail.subject;

           var body = new TextPart("plain")
           {
               Text = toSendEmail.message
           };

           var multipart = new Multipart("mixed");
           multipart.Add(body);

           using(var smtp = new SmtpClient())
           {
                
               if(!string.IsNullOrEmpty(fileName))
               {
                    MimePart attachment = LoadAttachment(fileName);
                    multipart.Add(attachment);
               }

               email.Body = multipart;

                var smtpHost = _configuration["Smtp:Host"];
                var smtpPort = int.Parse(_configuration["Smtp:Port"]);
                var smtpUsername = _configuration["Smtp:Username"];
                var smtpPassword = _configuration["Smtp:Password"];

                await smtp.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);

                await smtp.AuthenticateAsync(smtpUsername,smtpPassword);
                await smtp.SendAsync(email); 

                await smtp.DisconnectAsync(true);
                
           }
        }

        public async Task<List<MimeMessage>> ReciveEmailsAsync(string? fromAddress = null) 
        {
            string folderName = "INBOX";
            int maxEmails = 50;

            using(var client = new ImapClient())
            {
                var imapHost = _configuration["Imap:Host"];
                var imapPort = int.Parse(_configuration["Imap:Port"]);
                var imapUsername = _configuration["Imap:Username"];
                var imapPassword = _configuration["Imap:Password"];

                await client.ConnectAsync(imapHost,imapPort,MailKit.Security.SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(imapUsername, imapPassword);

                var inbox = client.Inbox;
                await inbox.OpenAsync(MailKit.FolderAccess.ReadOnly);

                var messages = new List<MimeMessage>();
                int count = inbox.Count;

                for(int i = count-1; i >= Math.Max(count- maxEmails,0); i--)
                {
                    var message = await inbox.GetMessageAsync(i);
                    if(fromAddress == null || message.From.Mailboxes.Any(m => m.Address.Equals(fromAddress,StringComparison.OrdinalIgnoreCase)))
                    {
                        messages.Add(message);
                    }
                }

                //EKSPERYMENTALNY nalezy sprawdzic pod kontem czytelnosci i optymalizacji

                var outbox = client.GetFolder(MailKit.SpecialFolder.Sent);
                await outbox.OpenAsync(MailKit.FolderAccess.ReadOnly);
                var oCount = outbox.Count;

                for(int i = oCount-1; i >= Math.Max(oCount- maxEmails,0); i--)
                {
                    var message = await outbox.GetMessageAsync(i);
                    if(fromAddress == null || message.To.Mailboxes.Any(m => m.Address.Equals(fromAddress,StringComparison.OrdinalIgnoreCase)))
                    {
                        messages.Add(message);
                    }
                }
                await client.DisconnectAsync(true);
                return messages;
            }
        }

        private MimePart LoadAttachment(string fileName)
        {
            string wwwrootPath = _webHostEnvironment.WebRootPath;
            string attachmentPath = Path.Combine(wwwrootPath,"uploads",fileName);

            if (File.Exists(attachmentPath))
            {
                byte[] fileBytes = File.ReadAllBytes(attachmentPath);
                
                    var mimeAttachment = new MimePart("application", "octet-stream")
                    {
                        Content = new MimeContent(new MemoryStream(fileBytes), ContentEncoding.Default),
                        ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                        ContentTransferEncoding = ContentEncoding.Base64,
                        FileName = Path.GetFileName(fileName)
                    };
                    return mimeAttachment;
            }
            else throw new FileNotFoundException("File was not found");

        }
    }

    public class EmailMessage : IEmailMessage
    {
        private readonly string emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$"; 
        public string email { get;set;}
        public string subject { get; set; }
        public string message { get; set; }


        public EmailMessage(string email, string subject, string message)
        {
        if(!Regex.IsMatch(email,emailRegex))
        {
            throw new EmailValidationException("Patient does have invalid email"); 
        }
        this.email = email;
        this.subject = subject;
        this.message = message;
        }
    }

}


