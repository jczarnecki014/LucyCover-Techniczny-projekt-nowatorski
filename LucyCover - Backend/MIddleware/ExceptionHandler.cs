using FluentValidation;
using LucyCover___Backend.Exceptions;
using System.Security.Authentication;

namespace LucyCover___Backend.MIddleware
{
    public class ExceptionHandler: IMiddleware
    {
        public ExceptionHandler(){ }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try 
            {
                await next.Invoke(context);
            }
            catch (Exception ex) when (ex is BadHttpRequestException || ex is InvalidOperationException) 
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (Exception ex) when (ex is UnauthorizedAccessException || ex is InvalidCredentialException )
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (Exception ex) when (ex is EntityNotFoundException || ex is FileNotFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (Exception ex) when (ex is EntityAlreadyExistException || ex is FileAlreadyExistException || ex is RelationBetweenEntityException) {
                context.Response.StatusCode = 409;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (Exception ex) when (ex is EmailValidationException || ex is ArgumentException) {
                context.Response.StatusCode = 422;
                /*await context.Response.WriteAsync(ex.Message);*/
                await context.Response.WriteAsync(ex.ToString());
            }
            catch(Exception ex){
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
