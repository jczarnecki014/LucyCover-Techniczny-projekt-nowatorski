﻿using LucyCover___Backend.Exceptions;
using LucyCover___Backend.Utility;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Net.Smtp;
using MailKit.Search;
using MimeKit;
using Org.BouncyCastle.Pqc.Crypto.Frodo;
using System.Text.RegularExpressions;

namespace LucyCover___Backend.Services
{
    public interface IEmailService 
    {
          public Task SendEmailAsync(IEmailMessage toSendEmail, string? fileName=null);
          public Task<List<MimeMessage>> ReciveEmailsAsync(string fromAddress = null); 
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

        public async Task SendEmailAsync(IEmailMessage toSendEmail, string? filePath=null)
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
                
               if(!string.IsNullOrEmpty(filePath))
               {
                    MimePart attachment = LoadAttachment(filePath);
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

        public async Task<List<MimeMessage>> ReciveEmailsAsync(string fromAddress) 
        {
            using(var client = new ImapClient())
            {
                var imapHost = _configuration["Imap:Host"];
                var imapPort = int.Parse(_configuration["Imap:Port"]);
                var imapUsername = _configuration["Imap:Username"];
                var imapPassword = _configuration["Imap:Password"];

                await client.ConnectAsync(imapHost,imapPort,MailKit.Security.SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(imapUsername, imapPassword);

                List<MimeMessage> inboxMessages = await GetMessagesByQuery(client.Inbox, SearchQuery.FromContains(fromAddress.ToLower()));
                List<MimeMessage> outboxMessages = await GetMessagesByQuery(client.GetFolder(SpecialFolder.Sent), SearchQuery.ToContains(fromAddress.ToLower()));

                List<MimeMessage> messages = inboxMessages.Concat(outboxMessages).ToList();

                await client.DisconnectAsync(true);
                return messages;
            }
        }

        private MimePart LoadAttachment(string filePath)
        {
            if (File.Exists(filePath))
            {
                byte[] fileBytes = File.ReadAllBytes(filePath);
                
                    var mimeAttachment = new MimePart("application", "octet-stream")
                    {
                        Content = new MimeContent(new MemoryStream(fileBytes), ContentEncoding.Default),
                        ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                        ContentTransferEncoding = ContentEncoding.Base64,
                        FileName = Path.GetFileName(filePath)
                    };
                    return mimeAttachment;
            }
            else throw new FileNotFoundException("File was not found");

        }

        private async Task<List<MimeMessage>> GetMessagesByQuery(IMailFolder folder,TextSearchQuery query)
        {
            ArgumentNullException.ThrowIfNull(query, nameof(query));
            await folder.OpenAsync(MailKit.FolderAccess.ReadOnly);

            IList<UniqueId> uids = await folder.SearchAsync(query);

            List<MimeMessage> messages = new List<MimeMessage>();

            foreach(var uid in uids)
            {
                var message = await folder.GetMessageAsync(uid);
                messages.Add(message);
            }
            return messages;
        }
    }

    public class EmailMessage : IEmailMessage
    {
        public string email { get;set;}
        public string subject { get; set; }
        public string message { get; set; }


        public EmailMessage(string email, string subject, string message)
        {
            if(!REGEX.EmailRegex.IsMatch(email))
            {
                throw new EmailValidationException("Patient has not assigned valid email"); 
            }
        this.email = email;
        this.subject = subject;
        this.message = message;
        }
    }

}

